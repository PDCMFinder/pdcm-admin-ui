import React from 'react'
import StatisticsLineChart from '../../components/charts/statisticsLineChart/StatisticsLineChart';
import { getAllReleasesSummaries } from '../../apis/Statistics.api';
import { useQuery } from 'react-query';

/**
 * A page to show different charts with statistics for the releases
 * @returns 
 */
const StatisticsPage = () => {

    const allReleasesSummariesQuery = useQuery(
        ["all_releases_summaries"],
        () => getAllReleasesSummaries()
    );

    const allReleasesSummariesFetchedData = allReleasesSummariesQuery.data || [];
    const allReleasesSummariesReversed = [...allReleasesSummariesFetchedData].reverse();

    const modelCountsPerReleaseKeys = [
        {
            keyName: "totalNumberOfModels",
            keyLabel: "Total"
        },
        {
            keyName: "numberOfPdxModels",
            keyLabel: "PDX"
        },
        {
            keyName: "numberOfCellLineModels",
            keyLabel: "Cell line"
        },
        {
            keyName: "numberOfOrganoidModels",
            keyLabel: "Organoids"
        },
        {
            keyName: "numberOfOtherModels",
            keyLabel: "Other"
        }
    ];


    const transformToDataByKey = (data) => {
        const dataByKey = {};
        modelCountsPerReleaseKeys.forEach(keyTitles => {
            const { keyName, keyLabel } = keyTitles;
            dataByKey[keyLabel] = [];
            data.forEach(release => {
                const label = release.name + " " + new Date(release.date).toLocaleDateString();
                const value = release.metrics[keyName] ?? 0;

                const dataPoint = {
                    x: label,
                    y: value
                }
                dataByKey[keyLabel].push(dataPoint);
            });

        });
        return dataByKey;
    };

    const formatToChartData = (dataByKey) => {
        const chartData = [];

        for (const [key, value] of Object.entries(dataByKey)) {
            const id = key;
            const data = value.map((dataPoint) => ({ x: dataPoint.x, y: dataPoint.y }));
            chartData.push({
                id: id,
                data: data
            });
        }
        return chartData;
    }

    const countsByKey = transformToDataByKey(allReleasesSummariesReversed);
    const countsByKeyChartFormattedData = formatToChartData(countsByKey);

   
    return (
        <div style={{ height: "400px", width: "1200px" }}>
            <h2>Release Statistics</h2>
            <StatisticsLineChart data={countsByKeyChartFormattedData} legend="Number of models per release" />
        </div>
    )
}

export default StatisticsPage