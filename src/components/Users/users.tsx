"use client";
import { useMemo } from "react";
import { useTable, Column } from "react-table";
import Head from "next/head";
import { UsersTypes } from "@/lib/utils/user-type";
import { useFetchUsers } from "./hooks";
import { useRouter } from "next/navigation";

function Users() {
  const router = useRouter();

  const columns: Column<UsersTypes>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "City",
        accessor: (row: UsersTypes) => row.address.city,
      },
    ],
    []
  );

  const { data, isLoading } = useFetchUsers();

  const handleRowClick = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<UsersTypes>({ columns, data });

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>User Table</title>
      </Head>

      <h1 className="text-2xl mb-4">User Table</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table
          {...getTableProps()}
          className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden"
        >
          <thead className="bg-blue-500 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => {
                  const { key, ...headerProps } = column.getHeaderProps();
                  return (
                    <th
                      {...headerProps}
                      key={key}
                      className="border border-gray-300 px-4 py-2 font-semibold text-left"
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const userId = row.values.id;

              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(userId)}
                >
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <td
                        {...cellProps}
                        key={key}
                        className="border border-gray-300 px-4 py-2 text-black"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
