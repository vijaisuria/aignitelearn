var ctx = document.getElementById("myChart").getContext("2d");
var ctx1 = document.getElementById("myChart1").getContext("2d");
var progress = document.getElementById("myChart2").getContext("2d");
var popularCourse = document.getElementById("myChart3").getContext("2d");
var performance = document.getElementById("myChart4").getContext("2d");
var myChart = new Chart(ctx, {
  type: "polarArea",
  data: {
    labels: [
      "User Engagement Levels",
      "Module Completion Rate",
      "AI Bot Interaction Success Rate",
    ],
    datasets: [
      {
        label: "Analysis Report",
        data: [75, 60, 85],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],

        borderWidth: 1,
      },
    ],
  },
  options: {
    Response: true,
    plugins: {
      title: {
        display: true,
        text: "Analysis Report",
        font: {
          size: 18,
        },
        color: "#ebe7f2",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        labels: {
          color: "#002447",
        },
      },
    },
  },
});
var myChart = new Chart(ctx1, {
  type: "bar",
  data: {
    labels: [
      "Complete Onboarding Process",
      "Finish First Course Module",
      "Pass a Mock Test",
      "Earn First Certificate",
      "Complete a Skill Assessment",
    ],
    datasets: [
      {
        label: "Milestone",
        data: [5, 10, 7, 15, 12],
        backgroundColor: [
          "rgba(255, 99, 133, 0.57)",
          "rgba(54, 163, 235, 0.55)",
          "rgba(255, 207, 86, 0.56)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.53)",
          "rgba(255, 160, 64, 0.51)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    indexAxis: "y", // Horizontal Bar Chart
    plugins: {
      title: {
        display: true,
        text: "Average Time Taken per Milestone",
        font: {
          size: 18,
        },
        color: "#ebe7f2",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        labels: {
          color: "#002447",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (in Days)",
          color: "rgb(54, 39, 86)", // X-axis title color
        },
        ticks: {
          color: "rgb(54, 39, 86)", // X-axis tick labels color
        },
      },
      y: {
        title: {
          display: true,
          text: "Milestones",
          color: "rgb(54, 39, 86)", // Y-axis title color
        },
        ticks: {
          color: "rgb(54, 39, 86)", // Y-axis tick labels color
        },
      },
    },
  },
});

var myChart = new Chart(progress, {
  type: "line",
  data: {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Month 2",
      "Month 3",
      "Month 4",
    ],
    datasets: [
      {
        label: "Quiz Completion (%)",
        data: [40, 55, 65, 75, 85, 92, 98],
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue for Quizzes
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Assignment Completion (%)",
        data: [30, 45, 60, 70, 80, 88, 95],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Green for Assignments
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Feedback Submission (%)",
        data: [20, 35, 50, 65, 75, 83, 90],
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red for Feedback
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Student Progress Over Time",
        font: {
          size: 18,
        },
        color: "#ebe7f2",
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        display: true,
        labels: {
          color: "#002447",
        },
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks/Months",
          color: "rgb(54, 39, 86)", // X-axis title color
        },
        ticks: {
          color: "rgb(54, 39, 86)", // X-axis tick labels color
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage of Completion",
          color: "rgb(54, 39, 86)", // Y-axis title color
        },
        ticks: {
          color: "rgb(54, 39, 86)", // Y-axis tick labels color
        },
      },
    },
  },
});

var myChart = new Chart(popularCourse, {
  type: "pie", // Pie or Doughnut chart works well
  data: {
    labels: [
      "AI & Machine Learning",
      "Data Science",
      "Web Development",
      "Cloud Computing",
      "Cybersecurity",
      "Digital Marketing",
      "UI/UX Design",
    ],
    datasets: [
      {
        label: "Course Usage Percentage",
        data: [25, 20, 18, 12, 10, 8, 7],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)", // AI & Machine Learning
          "rgba(54, 162, 235, 0.7)", // Data Science
          "rgba(255, 206, 86, 0.7)", // Web Development
          "rgba(153, 102, 255, 0.7)", // Cloud Computing
          "rgba(255, 99, 132, 0.7)", // Cybersecurity
          "rgba(255, 159, 64, 0.7)", // Digital Marketing
          "rgba(201, 203, 207, 0.7)", // UI/UX Design
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Popular Courses and Usage Percentage",
        font: {
          size: 18,
        },
        color: "#ebe7f2",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          // Ensure label text wraps
          textAlign: "center",
          maxWidth: 150, // Adjust the width as needed
          boxWidth: 20, // Adjust the legend box size
          usePointStyle: true,
          color: "#002447",
        },
      },
    },
  },
});

var myChart = new Chart(performance, {
  type: "radar",
  data: {
    labels: ["Accuracy", "Speed", "Relevance", "Satisfaction", "Engagement"],
    datasets: [
      {
        label: "AI Performance Metrics",
        data: [90, 85, 88, 92, 87],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "AI Performance",
        font: {
          size: 18,
        },
        color: "#ebe7f2",
      },
      legend: {
        labels: {
          color: "#002447",
        },
      },
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          color: "rgb(30, 15, 63)", // Color for the labels around the radar
          font: {
            size: 14,
          },
        },
        ticks: {
          color: " rgb(54, 39, 86)", // Color for the ticks (values on the radar axis)
          backdropColor: "transparent", // Remove background color behind ticks
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#cccccc", // Color for grid lines
        },
      },
    },
  },
});
