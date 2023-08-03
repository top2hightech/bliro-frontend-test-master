import { KeyboardEvent, useEffect, useReducer, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useStore } from '../../store'

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function Pagination() {
  const { curPage, pagePerSize, totalItems, loadBooksByPage } = useStore();
  const [startIdx, setStartIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const pageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStartIdx((curPage - 1) * pagePerSize + 1);
    setLastIdx(curPage * pagePerSize);
    setTotalPage(Math.floor(totalItems / pagePerSize));
    if(pageRef.current)
      pageRef.current.value = curPage.toString();
  }, [curPage])

  const handlePageChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      const value = parseInt(e.currentTarget.value);
      const page = Math.min(isNaN(value) ? 0 : value, totalPage);
      loadBooksByPage(page);
    }
  }

  return (
    <div className="flex justify-center items-center sm:justify-between border rounded-md border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="hidden sm:flex">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIdx}</span> to <span className="font-medium">{lastIdx}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <span
              onClick={() => {
                if(curPage === 1) return;
                loadBooksByPage(curPage - 1)
              }}
              className="relative inline-flex items-center cursor-pointer rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <input 
              ref={pageRef}
              type="number"
              readOnly
              defaultValue={curPage}
              onKeyDown={handlePageChange}
              className="w-16 px-2 py-2 text-black ring-1 border-none text-center ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" 
            />
            <span
              onClick={() => loadBooksByPage(curPage + 1)}
              className="relative inline-flex items-center cursor-pointer rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  )
}