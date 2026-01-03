import { useState } from 'react'
import Select, { SingleValue } from 'react-select'

interface GenreOption {
  value: string
  label: string
}

const genreOptions: GenreOption[] = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '53', label: 'Thriller' },
  { value: '10770', label: 'TV Movie' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
]

interface GenrePickerProps {
  onGenreChange: (genreId: string | null) => void
}

export default function GenrePicker({ onGenreChange }: GenrePickerProps) {
  const [selectedGenre, setSelectedGenre] =
    useState<SingleValue<GenreOption>>(null)

  const handleChange = (option: SingleValue<GenreOption>) => {
    setSelectedGenre(option)
    onGenreChange(option ? option.value : null)
  }

  return (
    <Select
      options={genreOptions}
      value={selectedGenre}
      onChange={handleChange}
      placeholder="Select a genre..."
      isSearchable
      isClearable
    />
  )
}
