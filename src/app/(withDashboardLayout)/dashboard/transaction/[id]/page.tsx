import TransactionDetailsPAge from "./TransactionDetailsPage";


const TransactionDetails = async ({params}:{params:Promise<{id:string}>}) => {
  const data= await params;
  const {id}=data;
  return (
    <div>
      <TransactionDetailsPAge id={id} />
    </div>
  );
};

export default TransactionDetails;