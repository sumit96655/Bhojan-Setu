const AnalyticsPanel = ({ data }) => {
    if (!data) {
      return <div>Loading...</div>
    }
  
    return (
      <div>
        <h2>Analytics Panel</h2>
        <p>Total Users: {data.totalUsers}</p>
        <p>Active Users: {data.activeUsers}</p>
        {/* Add more analytics data here */}
      </div>
    )
  }
  
  export default AnalyticsPanel
  
  