import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartProps {
  series: number[];
  labels: Array<string>;
}

export default function HoldingsAreaChart(props: ChartProps) {

  let data = new Array();
  if (typeof props.labels != 'undefined') {
    props.labels.map((item, i) => (
      data.push({
        name: item,
        data: props.series,
      })
    ));
  }
  const series = data;
  const options: ApexOptions = {
    chart: {
      width: 380,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    labels: props.labels,
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => {
          return `$${val}`;
        },
      },
    },
    title: {
      text: 'Current Holdings',
      align: 'left',
      offsetX: 14,
      margin: 30,
      style: {
        color: '#FFFFFF',
        fontSize: '16',
      },
    },
    legend: {
      show: true,

      fontSize: '20px',
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: undefined,
        useSeriesColors: true,
      },
      formatter: function (val, opts) {
        return val + ' - $ ' + opts.w.globals.series + '';
      },
      markers: {
        width: 10,
        height: 10,
        strokeColor: '#fff',
        fillColors: undefined,
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
    ],

  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={300} />
    </div >
  );
}
