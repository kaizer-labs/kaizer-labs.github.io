import { useEffect, useRef } from "react";

interface Milestone {
  date: string;
  roleTitle?: string;
  label: string;
  detail: string;
}

interface TimelineItem {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  milestones: Milestone[];
}

interface ProfessionalTimelineProps {
  items: TimelineItem[];
}

export function ProfessionalTimeline({ items }: ProfessionalTimelineProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const roleRef = useRef<HTMLHeadingElement | null>(null);
  const companyRef = useRef<HTMLParagraphElement | null>(null);
  const periodRef = useRef<HTMLParagraphElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const labelRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const sortedItems = [...items].sort((left, right) =>
    left.startDate.localeCompare(right.startDate),
  );
  const currentPrimaryItem =
    sortedItems.find((item) => item.company === "Goodyear") ??
    sortedItems.find((item) => item.period.includes("Present")) ??
    sortedItems[0];
  const currentPrimaryMilestone =
    currentPrimaryItem?.milestones[currentPrimaryItem.milestones.length - 1];

  useEffect(() => {
    if (!svgRef.current || !stageRef.current) return;

    const svg = svgRef.current;
    const stage = stageRef.current;
    let isCancelled = false;

    const milestones = sortedItems
      .flatMap((item) =>
        item.milestones.map((milestone) => ({
          ...milestone,
          item,
          parsedDate: new Date(`${milestone.date}-01T00:00:00`),
        })),
      )
      .sort((left, right) => left.parsedDate.getTime() - right.parsedDate.getTime());

    if (milestones.length === 0) return;

    const renderTimeline = async () => {
      const d3 = await import("d3");
      if (isCancelled) return;

      const width = stage.clientWidth || 960;
      const isMobile = window.matchMedia("(max-width: 959px)").matches;
      const margin = isMobile
        ? { top: 36, right: 22, bottom: 34, left: 22 }
        : { top: 44, right: 36, bottom: 46, left: 36 };
      const innerWidth = Math.max(320, width - margin.left - margin.right);
      const height = isMobile ? 270 : 320;
      const itemIds = sortedItems.map((item) => item.id);
      const color = d3
        .scaleOrdinal<string, string>()
        .domain(itemIds)
        .range(["#0f766e", "#1d4ed8", "#d97706"]);

      const xDomain = d3.extent(milestones, (milestone) => milestone.parsedDate);
      const x = d3
        .scaleTime()
        .domain(xDomain as [Date, Date])
        .range([margin.left, margin.left + innerWidth]);

      const axisY = height - margin.bottom;
      const lineY = axisY - (isMobile ? 86 : 112);
      const lastMilestone = milestones[milestones.length - 1];
      const endReference = d3.timeMonth.offset(lastMilestone.parsedDate, 2);

      const rootSvg = d3
        .select(svg)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      rootSvg.selectAll("*").remove();

      rootSvg
        .append("line")
        .attr("class", "professional-timeline-d3__axis-line")
        .attr("x1", margin.left)
        .attr("x2", margin.left + innerWidth)
        .attr("y1", axisY)
        .attr("y2", axisY);

      const axis = d3
        .axisBottom(x)
        .ticks(isMobile ? 4 : 6)
        .tickFormat(d3.timeFormat("%b %Y") as never);

      rootSvg
        .append("g")
        .attr("class", "professional-timeline-d3__axis")
        .attr("transform", `translate(0, ${axisY})`)
        .call(axis)
        .call((group) => group.select(".domain").remove());

      const backdrop = rootSvg
        .append("g")
        .attr("class", "professional-timeline-d3__backdrop");

      backdrop
        .selectAll("rect")
        .data(sortedItems)
        .enter()
        .append("rect")
        .attr("class", "professional-timeline-d3__band")
        .attr("x", (item) => x(new Date(`${item.startDate}-01T00:00:00`)))
        .attr("y", lineY + 28 + (isMobile ? 0 : 2))
        .attr("width", (item) => {
          const endDate =
            item.endDate === "Present"
              ? endReference
              : new Date(`${item.endDate}-01T00:00:00`);
          return Math.max(
            24,
            x(endDate) - x(new Date(`${item.startDate}-01T00:00:00`)),
          );
        })
        .attr("height", isMobile ? 10 : 12)
        .attr("rx", 999)
        .attr("fill", (item) =>
          d3.color(color(item.id))?.copy({ opacity: 0.16 }).formatRgb() ?? "#0f766e",
        );

      backdrop
        .append("path")
        .attr("class", "professional-timeline-d3__elastic-line")
        .attr(
          "d",
          d3
            .line<(typeof milestones)[number]>()
            .x((milestone) => x(milestone.parsedDate))
            .y(() => lineY)
            .curve(d3.curveCatmullRom.alpha(0.65))(milestones) ?? "",
        );

      const milestoneGroup = rootSvg
        .append("g")
        .attr("class", "professional-timeline-d3__milestones");
      const tooltipGroup = rootSvg
        .append("g")
        .attr("class", "professional-timeline-d3__tooltip")
        .style("pointer-events", "none");
      const travelerGroup = rootSvg
        .append("g")
        .attr("class", "professional-timeline-d3__traveler")
        .style("pointer-events", "none");

      const tooltipRect = tooltipGroup
        .append("rect")
        .attr("rx", 14)
        .attr("ry", 14)
        .attr("class", "professional-timeline-d3__tooltip-box");

      const tooltipDate = tooltipGroup
        .append("text")
        .attr("class", "professional-timeline-d3__tooltip-date");

      const tooltipTitle = tooltipGroup
        .append("text")
        .attr("class", "professional-timeline-d3__tooltip-title");

      travelerGroup
        .append("rect")
        .attr("class", "professional-timeline-d3__traveler-body")
        .attr("x", -16)
        .attr("y", -9)
        .attr("width", 28)
        .attr("height", 10)
        .attr("rx", 5);

      travelerGroup
        .append("rect")
        .attr("class", "professional-timeline-d3__traveler-sidepod")
        .attr("x", -10)
        .attr("y", -4)
        .attr("width", 14)
        .attr("height", 6)
        .attr("rx", 3);

      travelerGroup
        .append("rect")
        .attr("class", "professional-timeline-d3__traveler-cockpit")
        .attr("x", -2)
        .attr("y", -14)
        .attr("width", 10)
        .attr("height", 8)
        .attr("rx", 3);

      travelerGroup
        .append("circle")
        .attr("class", "professional-timeline-d3__traveler-wheel")
        .attr("cx", -8)
        .attr("cy", 3)
        .attr("r", 4);

      travelerGroup
        .append("circle")
        .attr("class", "professional-timeline-d3__traveler-wheel")
        .attr("cx", 8)
        .attr("cy", 3)
        .attr("r", 4);

      travelerGroup
        .append("path")
        .attr("class", "professional-timeline-d3__traveler-wing")
        .attr("d", "M 12 -7 L 18 -5 L 18 -1 L 12 1 Z");

      travelerGroup
        .append("path")
        .attr("class", "professional-timeline-d3__traveler-streak")
        .attr("d", "M -34 -7 L -20 -5 M -32 -2 L -18 -1 M -30 3 L -16 4");

      travelerGroup
        .append("circle")
        .attr("class", "professional-timeline-d3__traveler-trail trail-one")
        .attr("cx", -22)
        .attr("cy", -3)
        .attr("r", 2.5);

      travelerGroup
        .append("circle")
        .attr("class", "professional-timeline-d3__traveler-trail trail-two")
        .attr("cx", -28)
        .attr("cy", -1)
        .attr("r", 2);

      travelerGroup
        .append("circle")
        .attr("class", "professional-timeline-d3__traveler-trail trail-three")
        .attr("cx", -33)
        .attr("cy", 1)
        .attr("r", 1.75);

      const updateDetails = (milestone: (typeof milestones)[number]) => {
        if (roleRef.current) {
          roleRef.current.textContent = milestone.roleTitle || milestone.item.role;
        }
        if (companyRef.current) {
          companyRef.current.textContent = milestone.item.company;
        }
        if (periodRef.current) {
          periodRef.current.textContent = milestone.item.period;
        }
        if (dateRef.current) {
          dateRef.current.textContent = d3.timeFormat("%B %Y")(milestone.parsedDate);
        }
        if (labelRef.current) {
          labelRef.current.textContent = milestone.label;
        }
        if (textRef.current) {
          textRef.current.textContent = milestone.detail;
        }
      };

      const setActive = (milestone: (typeof milestones)[number]) => {
        milestoneGroup
          .selectAll(".professional-timeline-d3__event")
          .classed("is-active", (datum) => datum === milestone);

        const xPos = x(milestone.parsedDate);
        const tooltipWidth = isMobile ? 220 : 320;
        const tooltipHeight = isMobile ? 52 : 60;
        const tooltipX = Math.max(
          margin.left,
          Math.min(margin.left + innerWidth - tooltipWidth, xPos - tooltipWidth / 2),
        );
        const tooltipY = lineY - (isMobile ? 66 : 82);

        tooltipGroup.attr("transform", `translate(${tooltipX}, ${tooltipY})`);
        tooltipRect.attr("width", tooltipWidth).attr("height", tooltipHeight);
        tooltipDate
          .attr("x", 14)
          .attr("y", isMobile ? 18 : 20)
          .text(d3.timeFormat("%b %Y")(milestone.parsedDate));
        tooltipTitle
          .attr("x", 14)
          .attr("y", isMobile ? 38 : 40)
          .text(milestone.label);

        travelerGroup.attr("transform", `translate(${xPos}, ${lineY - 20})`);
        updateDetails(milestone);
      };

      const events = milestoneGroup
        .selectAll("g")
        .data(milestones)
        .enter()
        .append("g")
        .attr("class", "professional-timeline-d3__event")
        .attr("transform", (milestone) => `translate(${x(milestone.parsedDate)}, ${lineY})`)
        .style("cursor", "pointer")
        .on("mouseenter", (_event, milestone) => setActive(milestone))
        .on("click", (_event, milestone) => setActive(milestone));

      events
        .append("circle")
        .attr("class", "professional-timeline-d3__event-ring")
        .attr("r", isMobile ? 10 : 12)
        .attr("fill", "transparent")
        .attr("stroke", (milestone) => color(milestone.item.id));

      events
        .append("circle")
        .attr("class", "professional-timeline-d3__event-core")
        .attr("r", isMobile ? 5 : 6)
        .attr("fill", (milestone) => color(milestone.item.id));

      setActive(
        milestones.find(
          (milestone) => milestone.item.id === currentPrimaryItem?.id,
        ) ?? milestones[milestones.length - 1],
      );
    };

    void renderTimeline();

    const handleResize = () => {
      void renderTimeline();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPrimaryItem?.id, sortedItems]);

  const formatMonthYear = (value?: string) =>
    value
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(new Date(`${value}-01T00:00:00`))
      : "";

  return (
    <div className="professional-timeline-d3">
      <div className="professional-timeline-d3__stage" ref={stageRef}>
        <div className="professional-timeline-d3__legend">
          {sortedItems.map((item) => (
            <div className="professional-timeline-d3__legend-item" key={item.id}>
              <span
                className={[
                  "professional-timeline-d3__legend-dot",
                  `is-${item.id}`,
                ].join(" ")}
              ></span>
              <span>{item.company}</span>
            </div>
          ))}
        </div>
        <p className="professional-timeline-d3__hint">
          Hover the milestones to explore the timeline.
        </p>
        <svg
          className="professional-timeline-d3__svg"
          ref={svgRef}
          aria-label="Professional work timeline"
        ></svg>
      </div>
      <aside className="professional-timeline-d3__details">
        <p className="section-kicker">Professional work</p>
        <div className="professional-timeline-d3__current">
          <p className="professional-timeline-d3__current-label">Current primary role</p>
          <p className="professional-timeline-d3__current-role">
            {currentPrimaryItem?.role} · {currentPrimaryItem?.company}
          </p>
          <p className="professional-timeline-d3__current-note">
            Leading this role today while continuing independent AI and
            market-analysis exploration outside work.
          </p>
        </div>
        <h3 ref={roleRef}>{currentPrimaryItem?.role}</h3>
        <p className="professional-timeline-d3__company" ref={companyRef}>
          {currentPrimaryItem?.company}
        </p>
        <p className="professional-timeline-d3__period" ref={periodRef}>
          {currentPrimaryItem?.period}
        </p>
        <div className="professional-timeline-d3__milestone">
          <p className="professional-timeline-d3__milestone-date" ref={dateRef}>
            {formatMonthYear(currentPrimaryMilestone?.date)}
          </p>
          <h4 ref={labelRef}>{currentPrimaryMilestone?.label}</h4>
          <p ref={textRef}>{currentPrimaryMilestone?.detail}</p>
        </div>
      </aside>
    </div>
  );
}
