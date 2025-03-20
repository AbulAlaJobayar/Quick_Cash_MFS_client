import NotificationDetailsPage from "./NotificationDetailsPage";


const NotificationDetails = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <NotificationDetailsPage id={params?.id} />
    </div>
  );
};

export default NotificationDetails;
