const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) =>
{
    const Reservation = sequelize.define('Reservation',
    {
        StartDate:
        {
            type: Sequelize.DataTypes.DATE,
            validate:
            {
                isAfter: new Date().toDateString(),
            }
        },
        EndDate:
        {
            type: Sequelize.DataTypes.DATE,
            validate:
            {
                isAfter: new Date().toDateString(),
            }
        },
    },
    {
        validate:
        {
            bothDateSet()
            {
                if(this.EndDate == null || this.StartDate == null)
                {
                    throw new Error('Provide both dates');
                }
            },

            differenceBetweenDates()
            {
                if(this.EndDate != null && this.StartDate != null)
                {
                    if(this.StartDate > (this.EndDate))
                    {
                        throw new Error('Start date must be before the end date');
                    }
                    const start = new Date(this.StartDate);
                    const end = new Date(this.EndDate);
                    const diffTime = end - start
                    const dayTime = 1000 * 60 * 60 * 24;
                    if(diffTime < dayTime)
                    {
                        throw new Error('Start date should be at least one full day before the end date')
                    }
                }
            }
        },
        timestamps: false,
        hasTrigger: true
    });
	return Reservation
}