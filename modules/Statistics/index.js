const { gql } = require('apollo-server');
const { createModule } = require('graphql-modules');
const fetch = require('node-fetch');

const statisticsResolvers = {
  Query: {
    statistics: async () => {
      const data = await fetch('https://data.covid19.go.id/public/api/prov.json').then((res) => res.json());
      return data
    },
    statisticsByRegion: async (_, { region }) => {
      const data = await fetch('https://data.covid19.go.id/public/api/prov.json').then((res) => res.json());
      return data.list_data.find((item) => item.key === region);
    },
    regions: async () => {
      const data = await fetch('https://data.covid19.go.id/public/api/prov.json').then((res) => res.json());
      return data.list_data.map((item) => item.key);
    },
  },
}

const statisticsModule = createModule({
  id: 'statistics',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        statistics: Statistics
        regions: [String]
        statisticsByRegion(region: String): StatisticsRegion
      }

      type StatisticsKelompokValue {
        value: Float
      }

      type StatisticsKelompok {
        key: String
        doc_count: Int
        usia: StatisticsKelompokValue
      }

      type LocationData {
        lon: Float
        lat: Float
      }

      type CaseDelta {
        positif: Int
        sembuh: Int
        meninggal: Int
      }

      type StatisticsRegion {
        key: String
        doc_count: Float
        jumlah_kasus: Int
        jumlah_sembuh: Int
        jumlah_meninggal: Int
        jumlah_dirawat: Int
        jenis_kelamin: [StatisticsKelompok]
        kelompok_umur: [StatisticsKelompok]
        lokasi: LocationData
        penambahan: CaseDelta
      }

      type Statistics {
        last_date: String
        current_data: Int
        missing_data: Int
        list_data: [StatisticsRegion]
      }
    `,
  ],
  resolvers: [statisticsResolvers]
});

module.exports = statisticsModule;
