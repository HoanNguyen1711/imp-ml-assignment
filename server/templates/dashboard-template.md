---
title: 7 Days Traffic Analysis
sidebar: hide
---
```sql top_requesting_ips
SELECT 
  ClientIP,
  SUM(Total_Requests) as request_count
FROM cloudwatch.sum_requested_ip_7d
GROUP BY ClientIP
ORDER BY request_count DESC
LIMIT 10
```

<script>
    let myColors = [
        '#cf0d06',
        '#eb5752',
        '#e88a87',
        '#fcdad9',
        '#f8f1f1',
    ]
</script>

<BarChart 
  data={top_requesting_ips} 
  x="ClientIP" 
  y="request_count"
  title="Top 10 Client IPs by Request Volume"
  yAxisTitle="Total Requests"
  colorPalette={myColors}
/>