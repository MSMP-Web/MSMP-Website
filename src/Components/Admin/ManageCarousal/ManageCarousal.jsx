import BackButton from '../../BackButton/BackButton';

function ManageCarousal({onBack}) {
      const handleBack = () => {
    if (onBack) onBack("ManageGrid");
  };
  return (
    <BackButton onClick={handleBack}/>
  )
}

export default ManageCarousal