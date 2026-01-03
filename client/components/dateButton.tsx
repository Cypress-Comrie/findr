import { useState } from 'react'
import DatePicker from 'react-datepicker'

const YearDropDown = () => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showYearDropdown // this makes it a dropdown
      scrollableYearDropdown // this makes it scrollable
      yearDropdownItemNumber={50} // shows us the past 50 years
      // yearDropdownRange={[100, 0]} // supposed to give a range to choose from but have commented out due to error, will sort soon
    />
  )
}

export default YearDropDown
