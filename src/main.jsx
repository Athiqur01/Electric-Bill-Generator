import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Component/Root/Root';
import Home from './Component/Home/Home';
import AddSubescriber from './Component/AddSubescriber/AddSubescriber';
import BillRate from './Component/BillRate/BillRate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateBill from './Component/CreateBill/CreateBill';
import Bill from './Component/Bill/Bill';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/addSubescriber',
        element:<AddSubescriber></AddSubescriber>
      },
      {
        path:'/billRate',
        element:<BillRate></BillRate>
      },
      {
        path:'/createBill',
        element:<CreateBill></CreateBill>
      },
      {
        path:'/bill',
        element:<Bill></Bill>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  

<QueryClientProvider client={queryClient}>
<StrictMode>
    <div className='max-w-[1280px] mx-auto'>
    <RouterProvider router={router} />
    </div>
  </StrictMode>,
 </QueryClientProvider>

)
