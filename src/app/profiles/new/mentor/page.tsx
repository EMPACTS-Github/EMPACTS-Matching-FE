// "use client";

// import React from 'react';
// import HeaderSection from '../(components)/HeaderSection';
// import ProfilePictureUpload from '../(components)/ProfilePictureUpload';
// import MentorNameSection from '../(components)/MentorNameSection';
// import LocationBasedSection from '../(components)/LocationBasedSection';
// import ExpertiseSection from '../(components)/ExpertiseSection';
// import ActionButtons from '../(components)/ActionButtons';

// const CreateMentorProfile: React.FC = () => {
//   const [mentorName, setMentorName] = React.useState('');
//   const [selectedExpertise, setSelectedExpertise] = React.useState('');
//   return (
//     <div className="w-full flex justify-center items-center min-h-screen">
//       <div className="flex flex-col w-2/3 p-8 bg-white rounded-lg shadow-md space-y-4">
//         <HeaderSection />
//         <ProfilePictureUpload />
//         <MentorNameSection
//           mentorName={mentorName}
//           onMentorNameChange={setMentorName}
//         />
//         <LocationBasedSection />
//         <ExpertiseSection
//           selectedExpertise={selectedExpertise}
//           onExpertiseChange={setSelectedExpertise}
//         />
//         <ActionButtons />
//       </div>
//     </div>
//   );
// };

// export default CreateMentorProfile;
