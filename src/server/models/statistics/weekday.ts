import Sequelize from 'sequelize'

import { sequelize } from '../../util/sequelize'
import { IdType } from '../../../types/server/models'

export interface WeekdayClicksType extends IdType, Sequelize.Model {
  readonly shortUrl: string
  readonly weekday: number
  readonly hours: number
  readonly clicks: number
  readonly createdAt: string
  readonly updatedAt: string
}

type WeekdayClicksTypeStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): WeekdayClicksType
}

export const WeekdayClicks = <WeekdayClicksTypeStatic>sequelize.define(
  'weekday_stats',
  {
    shortUrl: {
      type: Sequelize.STRING,
      primaryKey: true,
      validate: {
        is: /^[a-z0-9-]+$/,
      },
    },
    weekday: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      validate: {
        /**
         * Number representing a day of the week.
         *
         * 0: Sunday.
         * 1: Monday.
         * 2: Tuesday.
         * 3: Wednesday.
         * 4: Thursday.
         * 5: Friday.
         * 6: Saturday.
         */
        rangeCheck(day: number) {
          return day >= 0 && day < 7
        },
      },
    },
    hours: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      validate: {
        rangeCheck(hours: number) {
          return hours >= 0 && hours < 24
        },
      },
    },
    clicks: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
)
