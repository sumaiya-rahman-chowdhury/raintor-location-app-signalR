import { User } from "@/app/types/types";

export default function UserCard({ user }: { user: User }) {
  return (
    <div
      className="w-full max-w-xs mx-auto p-5 border border-gray-200 rounded-xl shadow-sm flex gap-4 items-center"
      tabIndex={0}
      role="listitem"
      aria-label={`${user.firstName} ${user.lastName}`}
    >
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-16 h-16 rounded-full object-cover border border-gray-100"
      />

      <div className="flex-1 space-y-2">
        <h3 className="font-semibold text-gray-800 truncate">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-gray-600 text-sm truncate">{user.email}</p>
        <p className="text-gray-600 text-sm">{user.phone}</p>
        <div className="pt-2 mt-2 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700">
            {user.company.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">{user.university}</p>
        </div>
      </div>
    </div>
  );
}
