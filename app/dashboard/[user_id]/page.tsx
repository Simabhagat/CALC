"use client"
import { GetServerSideProps } from 'next';
import { useState,useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { Input, user, User } from '@nextui-org/react'
import Link from 'next/link'
import { useParams } from "next/navigation";



type User = {
  user_id: number;
  user_name: string;
  user_icon?: string;  // optional
};

const Dashboard = () => {
  return (
    <div className="flex flex-row gap-2 mx-auto my-auto px-2 py-4">
        <Sidebar/>
        <AddAppPage/>
    </div>
  )
}

export default Dashboard

const Sidebar = () => {
  const { user_id } = useParams(); // Get user_id from URL parameters
  const [user, setUser] = useState<User | null>(null); // Use "user" instead of "users"
  const [loading, setLoading] = useState(true);
  const [isActive, setActive] = useState("Add App");

  useEffect(() => {
    const fetchUser = async () => {
      if (user_id) {
        try {
          console.log("Fetching user with ID:", user_id);
          const response = await fetch(`/api/users?id=${user_id}`);
          console.log("Response status:", response.status); // Log the response status
          if (response.ok) {
            const data: User = await response.json();
            console.log("Fetched user data:", data);
            setUser(data);
          } else {
            console.error("Error response:", await response.json());
            setUser(null); // Set null if user is not found or there's an error
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchUser();
  }, [user_id]); // Add user_id as a dependency

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-[500px] sidebar">
      <div className="sidebar-wrapper">
        <Link className="sidebar-item" href="#">
          <User
            name=''
            avatarProps={{
              src: user?.user_icon || 'https://i.pravatar.cc/150?u=a04258114e29026702d',
            }}
          />
          <p className="sidebar-text">{user?.user_name}</p>
        </Link>
        <Link className={`sidebar-item ${("Add App" === isActive) ? "glass-effect" : ""}`} href="#" onClick={() => setActive("Add App")}>
          <p className={`sidebar-text ${("Add App" === isActive) ? "text-blue-600" : ""}`}>Add App</p>
        </Link>
        <Link className={`sidebar-item ${("Update App" === isActive) ? "glass-effect" : ""}`} href="#" onClick={() => setActive("Update App")}>
          <p className={`sidebar-text ${("Update App" === isActive) ? "text-blue-600" : ""}`}>Update App</p>
        </Link>
        <Link className={`sidebar-item ${("Delete App" === isActive) ? "glass-effect" : ""}`} href="#" onClick={() => setActive("Delete App")}>
          <p className={`sidebar-text ${("Delete App" === isActive) ? "text-blue-600" : ""}`}>Delete App</p>
        </Link>
      </div>
    </div>
  );
};





const AddAppPage = () => {
  const [app, setApp] = useState({
    app_name: '',
    app_icon: '',
    app_description: '',
    apk_url: '',
    apk_size: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApp({ ...app, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app),
      });
      if (!response.ok) throw new Error('Failed to create app');
      const newApp = await response.json();
      console.log('App created:', newApp);
    } catch (error) {
      console.error('Error creating app:', error);
    }
  };

  return (
    <div className='flex flex-col gap-5 items-center p-0 border -mt-10'>
      <h1 className='app-title '>Add New App</h1>
      <form className="wrapper" onSubmit={handleSubmit}>
        <Input className="input-wrapper"  type="text" label="App Name" placeholder="app name" />
        <Input className="input-wrapper" type="text" label="App Icon URL" placeholder="app icon url" />
        <Input className="input-wrapper" type="text" label="App Description" placeholder="description" />
        <Input className="input-wrapper" type="text" label="App URL" placeholder="app url" />
        <Input className="input-wrapper"  label="App Size" placeholder="app size" />
        <button type='submit'>Add App</button>
      </form>
    </div>
  );
};
