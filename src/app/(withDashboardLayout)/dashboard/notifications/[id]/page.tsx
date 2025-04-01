import NotificationDetailsPage from "./NotificationDetailsPage";


const NotificationDetails = async ({params}:{params:Promise<{id:string}>}) => {
  const data= await params;
  const {id}=data;
  return (
    <div>
      <NotificationDetailsPage id={id} />
    </div>
  );
};

export default NotificationDetails;
