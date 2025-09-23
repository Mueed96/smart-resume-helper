import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { User, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function ProfileDropdown() {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center rounded-full transition-opacity hover:opacity-90">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-primary-hover">
          {user ? getInitials(user.name) : '?'}
        </div>
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-surface shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link to="/profile" className={`${active ? 'bg-primary text-white' : 'text-text-body'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  <User className="mr-2 h-5 w-5" /> Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // --- THIS LINK IS NOW CORRECTED ---
                <Link to="/my-resumes" className={`${active ? 'bg-primary text-white' : 'text-text-body'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  <FileText className="mr-2 h-5 w-5" /> My Resumes
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button onClick={logout} className={`${active ? 'bg-error text-white' : 'text-error'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  <LogOut className="mr-2 h-5 w-5" /> Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}