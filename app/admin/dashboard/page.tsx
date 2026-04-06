'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, handleFirestoreError, OperationType } from '@/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { LogOut, Plus, Trash2, Edit2, ShieldAlert } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'logs'>('menu');
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.push('/admin/login');
      } else {
        setUser(u);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const unsubMenu = onSnapshot(collection(db, 'menu'), (snapshot) => {
      setMenuItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'menu'));

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      setGalleryImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'gallery'));

    const unsubLogs = onSnapshot(collection(db, 'security_logs'), (snapshot) => {
      setSecurityLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }, (error) => handleFirestoreError(error, OperationType.GET, 'security_logs'));

    return () => {
      unsubMenu();
      unsubGallery();
      unsubLogs();
    };
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const addMenuItem = async () => {
    const name = prompt('Item Name:');
    if (!name) return;
    const price = prompt('Price (e.g., ₦1,500):');
    const description = prompt('Description:');
    const category = prompt('Category (e.g., Main Course, Drinks):');

    try {
      await addDoc(collection(db, 'menu'), { name, price, description, category });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'menu');
    }
  };

  const editMenuItem = async (item: any) => {
    const name = prompt('Item Name:', item.name);
    if (!name) return;
    const price = prompt('Price (e.g., ₦1,500):', item.price);
    const description = prompt('Description:', item.description);
    const category = prompt('Category:', item.category);

    try {
      await updateDoc(doc(db, 'menu', item.id), { name, price, description, category });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `menu/${item.id}`);
    }
  };

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'menu', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `menu/${id}`);
    }
  };

  const addGalleryImage = async () => {
    const title = prompt('Image Title:');
    if (!title) return;
    const src = prompt('Image URL (e.g., https://images.unsplash.com/...):');
    const tagsStr = prompt('Tags (comma separated):');
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : [];

    try {
      await addDoc(collection(db, 'gallery'), { title, src, tags });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'gallery');
    }
  };

  const editGalleryImage = async (item: any) => {
    const title = prompt('Image Title:', item.title);
    if (!title) return;
    const src = prompt('Image URL:', item.src);
    const tagsStr = prompt('Tags (comma separated):', item.tags?.join(', '));
    const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : [];

    try {
      await updateDoc(doc(db, 'gallery', item.id), { title, src, tags });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `gallery/${item.id}`);
    }
  };

  const deleteGalleryImage = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-serif font-bold text-gray-900">Potoba Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 flex items-center gap-1 text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-4 mb-6 border-b pb-4">
          <button onClick={() => setActiveTab('menu')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'menu' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}>Menu Items</button>
          <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'gallery' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}>Gallery</button>
          <button onClick={() => setActiveTab('logs')} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${activeTab === 'logs' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}><ShieldAlert size={16}/> Security Logs</button>
        </div>

        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Menu</h2>
              <button onClick={addMenuItem} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-orange-700"><Plus size={16} /> Add Item</button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-medium text-gray-600">Name</th>
                    <th className="p-4 font-medium text-gray-600">Category</th>
                    <th className="p-4 font-medium text-gray-600">Price</th>
                    <th className="p-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 text-gray-600">{item.category}</td>
                      <td className="p-4 text-gray-600">{item.price}</td>
                      <td className="p-4 flex gap-2">
                        <button onClick={() => editMenuItem(item)} className="text-blue-500 hover:text-blue-700 p-1"><Edit2 size={16} /></button>
                        <button onClick={() => deleteMenuItem(item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {menuItems.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-500">No menu items found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Gallery</h2>
              <button onClick={addGalleryImage} className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-orange-700"><Plus size={16} /> Add Image</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {galleryImages.map(img => (
                <div key={img.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <img src={img.src} alt={img.title} className="w-full h-48 object-cover" />
                  <div className="p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{img.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{img.tags?.join(', ')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => editGalleryImage(img)} className="text-blue-500 hover:text-blue-700 p-1"><Edit2 size={16} /></button>
                      <button onClick={() => deleteGalleryImage(img.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
              {galleryImages.length === 0 && <div className="col-span-3 text-center py-8 text-gray-500">No images found.</div>}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Security Alerts (Honeypot)</h2>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-medium text-gray-600">Time</th>
                    <th className="p-4 font-medium text-gray-600">Action</th>
                    <th className="p-4 font-medium text-gray-600">Details</th>
                    <th className="p-4 font-medium text-gray-600">User Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {securityLogs.map(log => (
                    <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 text-gray-600 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="p-4 font-medium text-red-600">{log.action}</td>
                      <td className="p-4 text-gray-600">{log.details}</td>
                      <td className="p-4 text-xs text-gray-400 max-w-xs truncate" title={log.userAgent}>{log.userAgent}</td>
                    </tr>
                  ))}
                  {securityLogs.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-500">No security alerts logged.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
