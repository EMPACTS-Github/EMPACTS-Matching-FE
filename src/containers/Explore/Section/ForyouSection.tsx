// interface ForyouSectionProps {
//   mentorList: SuggestMentors[] | undefined;
// }

// const ForyouSection: React.FC<ForyouSectionProps> = ({ mentorList }) => {
// return (
//     {mentor.length !== 0 ? (
//         <div className='flex justify-between gap-4 p-4 flex-1 overflow-hidden'>
//           <div className='flex flex-col gap-4 w-1/3 overflow-y-auto h-full pr-2 custom-scrollbar'>
//             {mentor.map((mentor, index) => {
//               return (
//                 <MentorCard
//                   key={index}
//                   name={mentor.name}
//                   location={getProvince(mentor?.locationBased || '')}
//                   description={mentor.description}
//                   avatarUrl={mentor.avtUrl}
//                   matchScore={mentor.matchScore}
//                   isFavorite={mentor.isFavourite}
//                   onFavoriteClick={() => handleFavoriteClick(index)}
//                   onCardClick={() => handleMentorSelect(index)}
//                 />
//               );
//             })}
//           </div>
//           <ProfileInfoCard
//             className="w-2/3"
//             title={selectedMentor.name}
//             location={getProvince(selectedMentor?.locationBased || '')}
//             description={selectedMentor.description}
//             rating={4.5}
//             sdg="Profile SDG"
//             onFavoriteClick={() => setIsFavourite(!isFavourite)}
//             isFavorite={selectedMentor.isFavourite}
//             onClickButton={() => {
//               setIsOpen(true);
//             }}
//           />
//           <ConnectModal
//             isOpen={isOpen}
//             onClose={() => setIsOpen(false)}
//             mentorName='Do Chi Thanh'
//           />
//         </div>
//       ) : (
//         <div className='flex justify-center items-center h-[50%]'>
//           <Spinner classNames={{ label: "text-foreground mt-4" }} label="The system is finding the best mentors for you. Please wait..." variant="wave" />
//         </div>
//       )
//       }
// )