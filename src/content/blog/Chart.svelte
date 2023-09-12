<script>
    import Chart from 'svelte-frappe-charts';
  
    let data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'],
      datasets: [
        {
          values: [10, 12, 3, 9, 8, 15, 9,12,23,15,8,16,17]
        }
      ]
    };
  </script>
  
  <Chart data={data} type="line" />