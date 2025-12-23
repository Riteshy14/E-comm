export default function Address({ address }) {
  return (
    <div className="mt-3 text-sm text-gray-600">
      <p className="font-medium">
        {address.firstName} {address.lastName}
      </p>
      <div>
        <p>{address.street},</p>
        <p>
          {address.city}, {address.state}, {address.country}, {address.zipcode}
        </p>
        <p>{address.phone}</p>
      </div>
    </div>
  );
}
