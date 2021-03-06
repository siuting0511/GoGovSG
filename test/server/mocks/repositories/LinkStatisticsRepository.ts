/* eslint-disable class-methods-use-this */

import { injectable } from 'inversify'
import { LinkStatisticsRepositoryInterface } from '../../../../src/server/repositories/interfaces/LinkStatisticsRepositoryInterface'
import { LinkStatisticsInterface } from '../../../../src/shared/interfaces/link-statistics'
import { DeviceType } from '../../../../src/server/services/interfaces/DeviceCheckServiceInterface'

@injectable()
export class MockLinkStatisticsRepository
  implements LinkStatisticsRepositoryInterface {
  findByShortUrl: (
    shortUrl: string,
  ) => Promise<LinkStatisticsInterface | null> = () => {
    return Promise.resolve({
      totalClicks: 1,
      deviceClicks: {
        desktop: 1,
        tablet: 0,
        mobile: 0,
        others: 0,
      },
      dailyClicks: [{ date: '2020-06-23', clicks: 1 }],
      weekdayClicks: [{ weekday: 2, hours: 23, clicks: 1 }],
    })
  }

  incrementClick: (
    shortUrl: string,
    transaction?: import('sequelize/types').Transaction,
  ) => Promise<boolean> = () => Promise.resolve(true)

  updateLinkStatistics: (shortUrl: string, device: DeviceType) => void = () =>
    Promise.resolve(true)
}

export default MockLinkStatisticsRepository
