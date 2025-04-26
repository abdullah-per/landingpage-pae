function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function CellScramble() {
    const gridData = [
        [
            "Revenue Forecast",
            "Inventory Turnover",
            "Hiring Risk Index",
            "Lead Conversion Rate",
            "Operational Efficiency",
            "Vendor Delay Risk",
            "Marketing ROI",
            "Burn Rate",
            "Customer Retention",
            "Production Uptime",
            "Churn Probability",
            "Cost per Acquisition",
            "Sales Cycle Length",
            "Net Profit Margin",
            "Utilization Rate",
            "Forecast Accuracy",
            "Employee Engagement",
            "Customer Satisfaction",
            "Profitability Ratio",
            "Sales Forecast",
            "Productivity Index",
            "Market Share Growth",
            "Expense Management",
            "Customer Lifetime Value",
            "Product Launch Success",
            "Customer Acquisition Cost",
            "Supply Chain Efficiency",
            "Sales Growth Rate",
            "Employee Turnover Rate",
            "Customer Feedback Score",
            "Service Downtime",
            "Gross Margin Return",
            "Brand Awareness",
            "Customer Segmentation Effectiveness",
            "Time to Market",
            "IT System Uptime",
            "Return on Investment (ROI)",
            "Sales Funnel Efficiency",
            "Innovation Index",
            "Customer Support Response Time",
            "Sales Revenue Per Employee",
            "Order Fulfillment Rate",
            "Cost of Goods Sold",
            "Employee Satisfaction Index",
            "Business Profitability",
            "Market Penetration Rate",
            "Cost Efficiency Index",
            "Productivity per Hour",
            "On-time Delivery Rate",
            "Market Demand Forecast",
            "Gross Profit Margin",
            "Customer Churn Rate",
            "Employee Productivity",
            "Financial Forecast Accuracy",
            "Customer Satisfaction Index",
            "Return on Assets (ROA)",
            "Average Order Value",
            "Revenue per Customer",
            "Social Media Engagement",
            "Operational Cost Ratio",
            "Forecast Error Rate",
            "Strategic Alignment Index"
        ],

        [
        "↑ 15.2%",
        "Stable",
        "↑ Moderate",
        "↓ 2.6%",
        "↑ 4.1%",
        "↓ Slight",
        "↑ Sharp",
        "Stable",
        "↑ 1.2%",
        "↓ Gradual",
        "↑ Sudden",
        "↓ 0.9%",
        "↑ 3.4%",
        "↓ 1.1%",
        "Stable",
        "↑ Rapid",
        "↓ Risky"
        ],

        [
        "$1.3M",
        "4.7 cycles",
        "2.3 / 5",
        "18.4%",
        "76.1%",
        "73 hrs avg",
        "212%",
        "$53.2k/mo",
        "87.6%",
        "98.3%",
        "5.2%",
        "$34.8",
        "42 days",
        "19.7%",
        "64.2%",
        "91.1%",
        "3.9 / 5"
        ],

        [
        "92.5%",
        "86.1%",
        "78.9%",
        "95.4%",
        "88.2%",
        "80.7%",
        "91.0%",
        "89.6%",
        "94.2%",
        "96.8%",
        "84.3%",
        "79.5%",
        "90.2%",
        "87.1%",
        "93.6%",
        "85.8%",
        "88.9%"
        ],

        [
        "Just now",
        "1 min ago",
        "2 mins ago",
        "3 mins ago",
        "4 mins ago",
        "5 mins ago",
        "6 mins ago",
        "7 mins ago",
        "8 mins ago",
        "9 mins ago",
        "10 mins ago",
        "12 mins ago",
        "15 mins ago",
        "20 mins ago",
        "30 mins ago",
        "45 mins ago",
        "1 hour ago"
        ]
    ];

    function returnRandomString(string) {
        const letters = "abcdefghijklmnopqrstuvwxyz/\\".split("");
        const splitStr = string.split(" ");
        let retValue = "";

        splitStr.forEach((element) => {
            for (let i = 0; i < element.length; i++) {
                retValue += letters[Math.floor(Math.random()*letters.length)];
            }

            retValue += " ";
        })



        return retValue;
    }

    async function Scramble(element, column) {
        await sleep(Math.random()*15000);

        const goal = gridData[column-1][Math.floor(Math.random() * (gridData[column-1].length))];

        let completion = "";
        let count = 0;
        while (true) {
            await sleep(25);
            element.style.color = "inherit";
            element.innerHTML = completion + returnRandomString(goal.substring(completion.length));

            if (completion.length >= goal.length) {
                element.style.color = "#cccaca";
                await sleep(5000 + Math.random()*25000)
                completion = "";
                count = 0;
            } else {
                if (count >= 2) {
                    completion += goal[completion.length];
                    count = 0;
                }
            }

            count += 1;
        }
    }

    return Scramble;
}

let seen = 0;
const editableCellList = document.querySelectorAll(".scramble-anim");
const scrambler = CellScramble();

const observer = new IntersectionObserver((entries, observer) => {
    seen += 1;
    if (!(seen > 1 && seen <= 2)) { return }

    seen = true;
    let column = 0;
    for (let i in editableCellList) {
        column += 1;
        scrambler(editableCellList[i], column);

        if (column >= 5) {
            column = 0;
        }
    }
});

observer.observe(document.querySelector(".table"));


// ---
