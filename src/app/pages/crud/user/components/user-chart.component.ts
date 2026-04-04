import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-user-chart',
    standalone: true,
    imports: [CommonModule, CardModule, ChartModule],
    template: `
        <p-card header="User Activity">
            <p-chart type="line" [data]="chartData" [options]="chartOptions" class="w-full"></p-chart>
        </p-card>
    `
})
export class UserChartComponent implements OnInit {
    chartData: any;
    chartOptions: any;

    ngOnInit(): void {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color') || '#495057';
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color') || '#6c757d';
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color') || '#dfe7ef';

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Scores',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#14b8a6', // teal-500
                    tension: 0.4
                },
                {
                    label: 'Lessons Completed',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#f59e0b', // amber-500
                    tension: 0.4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: { color: textColor }
                }
            },
            scales: {
                x: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder, drawBorder: false }
                },
                y: {
                    ticks: { color: textColorSecondary },
                    grid: { color: surfaceBorder, drawBorder: false }
                }
            }
        };
    }
}
