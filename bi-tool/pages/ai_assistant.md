---
title: Sales Analysis Dashboard
sidebar: hide
---

```sql orders_by_month
SELECT
    date_trunc('month', order_datetime) as order_month,
    COUNT(*) as number_of_orders,
    SUM(sales) as sales_usd
FROM needful_things.orders
GROUP BY 1
ORDER BY 1 ASC
```

## Monthly Sales Performance

<LineChart 
    data={orders_by_month}    
    x="order_month"
    y="sales_usd" 
    title="Monthly Sales Trend" 
    yAxisTitle="Sales (USD)"
    colorPalette={["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"]}
/>

This chart displays the monthly sales trend over time. The warm red color highlights the sales performance, making it easy to identify peaks and troughs in your revenue. You can clearly see seasonal patterns and overall growth trajectory.

```sql sales_by_category
SELECT
    category,
    SUM(sales) as total_sales
FROM needful_things.orders
GROUP BY 1
ORDER BY 2 DESC
```

## Category Performance

<BarChart 
    data={sales_by_category}
    x="category"
    y="total_sales"
    title="Sales by Product Category"
    yAxisTitle="Total Sales (USD)"
    colorPalette={["#d62828", "#f77f00", "#fcbf49", "#eae2b7"]}
/>

This bar chart breaks down sales by product category. The warm orange-red color palette provides a clear visual hierarchy showing which categories are your top performers. This visualization helps identify your most profitable product lines that deserve additional focus or marketing resources.

```sql sales_by_channel
SELECT
    channel,
    channel_group,
    COUNT(*) as order_count,
    SUM(sales) as total_sales,
    AVG(sales) as average_order_value
FROM needful_things.orders
GROUP BY 1, 2
ORDER BY 4 DESC
```

## Sales Channel Analysis

<BarChart 
    data={sales_by_channel}
    x="channel"
    y="total_sales"
    title="Sales Performance by Channel"
    yAxisTitle="Total Sales (USD)"
    colorPalette={["#bc4749", "#a7c957", "#6a994e", "#386641"]}
    series="channel_group"
/>

This chart analyzes sales performance across different channels, grouped by channel type. The warm red highlights in the color palette make it easy to identify your highest-performing sales channels. Understanding which channels drive the most revenue helps optimize your marketing budget and sales strategies.