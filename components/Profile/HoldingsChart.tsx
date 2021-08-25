import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartProps {
  series: number[];
  labels: Array<string>;
}

export default function HoldingsChart(props: ChartProps) {
  const series = props.series;
  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: props.labels,
    title: {
      text: 'Current Holdings',
      align: 'left',

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
        return val + ' - $ ' + opts.w.globals.series[opts.seriesIndex] + '';
      },
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
      <Chart options={options} series={series} height={300} type="donut" />
    </div>
  );
}
