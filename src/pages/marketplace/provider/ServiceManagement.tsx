import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_SERVICES } from '@/data/marketplaceData';
import { Plus, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ServiceManagement() {
  // Filter services for "current user" (mock provider prov_001)
  const [services, setServices] = useState(MOCK_SERVICES.filter(s => s.providerId === 'prov_001'));

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Service Listings</h1>
            <p className="text-slate-500">Manage your service offerings and visibility.</p>
          </div>
          <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white shadow-sm">
            <Link to="/marketplace/provider/services/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Service Listing
            </Link>
          </Button>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Your Services</CardTitle>
            <CardDescription>
              You have {services.length} active listings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {services.length > 0 ? (
              <div className="rounded-md border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="w-[300px]">Service Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                              <img src={service.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="truncate max-w-[200px]">{service.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>
                          <Badge variant={service.status === 'published' ? 'default' : 'secondary'} className={service.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'}>
                            {service.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">
                          {service.updatedAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/marketplace/service/${service.id}`}>
                                  <Eye className="mr-2 h-4 w-4" /> View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/marketplace/provider/services/${service.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={() => handleDelete(service.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                  <Plus className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No services listed yet</h3>
                <p className="text-slate-500 mb-6">Create your first service listing to start receiving enquiries.</p>
                <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  <Link to="/marketplace/provider/services/new">
                    Create Service Listing
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
