import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import toast from 'react-hot-toast';
import { X, Plus, Save } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(5, 'Description is required'),
  price: z.preprocess((val) => Number(val), z.number().min(0, 'Price must be positive')),
  category: z.string().min(2, 'Category is required'),
});

type ProductForm = z.infer<typeof productSchema>;

interface Props {
  product?: any;
  onClose: () => void;
}

interface Props {
  product?: any;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: Props) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    } : undefined,
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductForm) => {
      if (product) {
        return api.put(`/products/${product._id}`, data);
      }
      return api.post('/products', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(product ? 'Product updated' : 'Product created');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Operation failed');
    },
  });

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {product ? <Save size={20} className="text-primary-400" /> : <Plus size={20} className="text-primary-400" />}
            {product ? 'Edit Product' : 'New Product'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit((data: ProductForm) => mutation.mutate(data))} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">Product Name</label>
              <input
                {...register('name')}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="High-performance item"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message as string}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">Price ($)</label>
              <input
                {...register('price')}
                type="number"
                step="0.01"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="99.99"
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message as string}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
              <input
                {...register('category')}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="Electronics"
              />
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message as string}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="Detailed information about the product..."
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message as string}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-lg transition-all"
            >
              {mutation.isPending ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
