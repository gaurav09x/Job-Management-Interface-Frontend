import React, { useState, useEffect } from 'react'
import './App.css'
import { Icons } from './components/icon/icons.jsx'
import DropDownMenu from './components/DropDownMenu'
import SalaryRangeSlider from './components/SalaryRangeSlider'
import { CreateJobPost } from './components/CreateJobPost.jsx';
import Location from './components/Location.jsx';
import JobCard from './components/JobCard.jsx'

function App() {
  const [createJobs, setCreateJobs] = useState(false);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [options, onChange] = useState(null);

  const jobTypeOptions = [
  { value: '', label: 'All Job Types' },
  { value: 'fulltime', label: 'Full-time' },
  { value: 'parttime', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const handleJobTypeChange = (option) => {
  setJobType(option.value);
};

  const fetchJobPost = async () => {
    try {
      const response = await fetch('https://job-management-interface-backend.onrender.com/api/get-job-post');
      const data = await response.json();
      setDisplayJobs(data.data);
      setFilteredJobs(data.data);
    }
    catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobPost();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobTitle, location, jobType, displayJobs]);

  const filterJobs = () => {
    let results = [...displayJobs];

    if (jobTitle.trim()) {
      results = results.filter(job =>
        job.job_title.toLowerCase().includes(jobTitle.toLowerCase())
      );
    }

    if (jobType.trim()) {
      results = results.filter(job =>
        job.job_type.toLowerCase().includes(jobType.toLowerCase())
      );
    }

    if (location.trim()) {
      results = results.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(results);
  };

  const handleCitySelection = (city) => {
    setLocation(city);
  };

  return (
    <div>
      <header className='bg-[#ffffff] shadow-[0px_0px_14px_0px_rgba(198,191,191,0.25)] flex flex-col items-center py-4 gap-5'>
        <section className='flex items-center gap-10 font-[600] bg-[#FCFCFC] px-6 border-[1px] border-[#FCFCFC] py-4 rounded-full shadow-[0px_0px_20px_0px_rgba(127,127,127,0.15)]'>
          <div>
            <img src="/logo.svg" alt="company logo" />
          </div>
          <nav className='text-[16px] font-[600] flex gap-10'>
            <a href="#">Home</a>
            <a href="#">Find Jobs</a>
            <a href="#">Find Talents</a>
            <a href="#">About Us</a>
            <a href="#">Testimonials</a>
          </nav>
          <button onClick={() => setCreateJobs(true)} className='bg-gradient-to-tr from-[#A128FF] to-[#6100AD] text-white px-4 py-2 rounded-full text-[16px] font-[600]'>
            Create Jobs
          </button>
        </section>
        <section className='w-full'>
          <div className='flex items-center justify-around'>
            <div className='flex gap-5'>
              <img src={Icons.searchIcon} alt="search" className='w-[18px]' />
              <input 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
                type="text" 
                className='w-[179px] placeholder:font-[500] outline-none' 
                placeholder='Search By Job Title, Role' 
              />
            </div>
            <div className='relative flex gap-5'>
              <div className='absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-10px]'></div>
              <Location
                placeholder={'Preferred Location'} 
                iconVisible={true} 
                onCitySelect={handleCitySelection}
                value={location}
              />
            </div>
            <div className='relative flex gap-5'>
              <div className='absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-60px] top-[-12px]'></div>
              <DropDownMenu options={jobTypeOptions} onChange={handleJobTypeChange} />
            </div>
            <div className='relative flex gap-5'>
              <div className='absolute h-[48px] border-[1.5px] border-[#cbcbcb] left-[-40px] top-[5px]'></div>
              <SalaryRangeSlider />
            </div>
          </div>
        </section>
      </header>
      <div className="grid gap-5 w-[92%] mx-auto my-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                brand_logo_img_url={job.brand_logo_img_url}
                job_title={job.job_title}
                experience_level={job.experience_level}
                location={job.location}
                max_salary={job.max_salary}
                job_description={job.job_description}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No jobs match your search criteria.</p>
            <p className="text-gray-500">Try adjusting your search terms or location.</p>
          </div>
        )}
      </div>
      {createJobs && <CreateJobPost createJobs={createJobs} setCreateJobs={(value) => setCreateJobs(value)} />}
    </div>
  )
}

export default App;
