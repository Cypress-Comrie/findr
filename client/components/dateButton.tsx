import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const YearDropDown = () => {
  const [startDate, setStartDate] = useState(new Date())
  const renderYearContent = (year: number) => {
    return <span>{year}</span>
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      renderYearContent={renderYearContent}
      showYearPicker
      dateFormat="yyyy"
    />
  )
}

export default YearDropDown
