import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface YearDropDownProps {
  onYearChange: (year: string) => void
}

const YearDropDown = ({ onYearChange }: YearDropDownProps) => {
  const [startDate, setStartDate] = useState(new Date())
  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date)
      onYearChange(date.getFullYear().toString())
    }
  }

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      showYearPicker
      dateFormat="yyyy"
      className="input input-bordered"
    />
  )
}

export default YearDropDown
