import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import githubLogo from './githubLogo.svg';
import { Link } from 'react-router-dom';

const Celebration = ({ personName, birthDay, birthMonth }) => {
  const [countdownData, setCountdownData] = useState({
    secondsLeft: 0,
    hoursLeft: 0,
    minutesLeft: 0,
    daysLeft: 0,
    isBirthdayToday: false,
  });

  if (!personName || !birthDay || !birthMonth) {
    personName = 'Akash';
    birthMonth = 9;
    birthDay = 24;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const isBirthday = currentDate.getDate() === birthDay && currentDate.getMonth() === birthMonth - 1;

  useEffect(() => {
    setInterval(() => {
      const calculateCountdown = () => {
        const currentMoment = new Date();
        let birthdayDate = new Date(currentYear, birthMonth - 1, birthDay);

        if (currentMoment > birthdayDate) {
          birthdayDate = new Date(currentYear + 1, birthMonth - 1, birthDay);
        } else if (currentMoment.getFullYear() === birthdayDate.getFullYear() + 1) {
          birthdayDate = new Date(currentYear, birthMonth - 1, birthDay);
        }

        const currentTime = currentMoment.getTime();
        const birthdayTime = birthdayDate.getTime();

        const timeDifference = birthdayTime - currentTime;

        let secondsLeft = Math.floor(timeDifference / 1000);
        let minutesLeft = Math.floor(secondsLeft / 60);
        let hoursLeft = Math.floor(minutesLeft / 60);
        let daysLeft = Math.floor(hoursLeft / 24);

        secondsLeft %= 60;
        minutesLeft %= 60;
        hoursLeft %= 24;

        setCountdownData((prevData) => ({
          ...prevData,
          secondsLeft,
          minutesLeft,
          hoursLeft,
          daysLeft,
          isBirthdayToday: isBirthday,
        }));
      };

      if (!isBirthday) {
        calculateCountdown();
      } else {
        setCountdownData((prevData) => ({
          ...prevData,
          isBirthdayToday: true,
        }));
      }
    }, 1000);
  }, [currentYear, birthDay, isBirthday, birthMonth]);

  let birthDate = new Date(currentYear, birthMonth - 1, birthDay);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];
  let birthMonthName = monthNames[birthDate.getMonth()];

  return (
    <div className='page'>
      <Countdown countdownData={countdownData} personName={personName} />
      {!isBirthday && (
        <>
          <div className='next-birthday'>
            Birthday coming on: {birthDay} {birthMonthName} {currentYear}
          </div>
          <div className='credits'>
            <a href='https://github.com/Deep-Codes'>
              <img src={githubLogo} alt='Github-Logo' className='github-logo' />
            </a>
          </div>
          <Link to='/generate'>Generate Here</Link>
        </>
      )}
    </div>
  );
};

export default Celebration;

