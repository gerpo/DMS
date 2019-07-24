<template>
    <div class="codes-statistics">
        <div class="chart-wrapper">
            <line-chart :chart-data="datacollection" :options="chartOptions" :styles="chartStyle"></line-chart>
        </div>
        <p>anderes zeug</p>
    </div>
</template>

<script>
    import LineChart from './LineChart'

    export default {
        name: "CodeStatisticsComponent",
        components: {
            LineChart
        },
        data: () => ({
            datacollection: { },
            height: 450,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            }
        }),
        computed: {
            chartStyle() {
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                }
            }
        },
        mounted() {
            this.fillData()
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ['Januar', 'Dezember'],
                    datasets: [
                        {
                            label: 'One',
                            data: [this.getRandomInt(), this.getRandomInt()],
                        },
                        {
                            label: 'Two',
                            data: [this.getRandomInt(), this.getRandomInt()]
                        }
                    ]
                }
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            }
        }
    }
</script>

<style scoped>

</style>