import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface YearDropDownProps {
  onYearChange: (year: string) => void
}

const YearDropDown = ({ onYearChange }: YearDropDownProps) => {
  const [startDate, setStartDate] = useState(new Date())

  const handleChange = (date: Date | null) => {
    setStartDate(null)
    if (date) {
      onYearChange(date.getFullYear().toString())
    } else {
      onYearChange(null)
    }
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      showYearPicker
      dateFormat="yyyy"
      placeholderText="Choose Date!"
      className="input input-bordered"
      isClearable
    />
  )
}

export default YearDropDown
