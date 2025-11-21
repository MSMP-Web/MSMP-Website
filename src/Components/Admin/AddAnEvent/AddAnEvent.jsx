import React from 'react'
import BackButton from '../../BackButton/BackButton';

function AddAnEvent({onBack}) {
      const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };
  return (
    <BackButton onClick={handleBack}/>
  )
}

export default AddAnEvent