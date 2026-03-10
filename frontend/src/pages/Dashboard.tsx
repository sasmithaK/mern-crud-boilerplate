import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { useAuth } from '../context/AuthContext.tsx';
import ProductForm from '../components/ProductForm.tsx';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, Box, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Delete failed');
    },
  });

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 bg-slate-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Product Catalog</h1>
          <p className="text-slate-400">Manage and oversee all inventory items in real-time.</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={20} />
          <span>New Product</span>
        </button>
      </div>

      {isError ? (
        <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-6 rounded-2xl text-center">
          <p>Error loading products. Please try again later.</p>
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-700">
          <div className="inline-flex p-6 bg-slate-800 rounded-full mb-4">
            <Box size={40} className="text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-300">No products found</h3>
          <p className="text-slate-500 mt-2 max-w-xs mx-auto">Start by adding your first professional product to the catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product: any) => (
            <div key={product._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all group shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary-900/30 text-primary-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-primary-500/20">
                  {product.category}
                </span>
                <div className="flex gap-2">
                  {(user?.role === 'admin' || user?._id === product.user?._id) && (
                    <>
                      <button onClick={() => handleEdit(product)} className="text-slate-400 hover:text-primary-400 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            deleteMutation.mutate(product._id);
                          }
                        }} 
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{product.name}</h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-700/50">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Price</span>
                  <div className="flex items-center gap-1 text-primary-400 font-bold text-lg">
                    <DollarSign size={16} />
                    <span>{product.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Added By</span>
                  <p className="text-slate-300 text-xs font-medium">{product.user?.name || 'Unknown'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <ProductForm 
          product={selectedProduct} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
