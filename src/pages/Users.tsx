import Header from "@/components/Header";
import AllUsersTable from "@/components/users/AllUsersTable";

const Users = () => {
  return (
    <div className="mx-auto pb-5 w-full">
      <div className="flex justify-between items-center mb-6">
        <Header name="Users" />
      </div>

      <div className="mb-6">
        <AllUsersTable />
      </div>
    </div>
  );
};

export default Users;
