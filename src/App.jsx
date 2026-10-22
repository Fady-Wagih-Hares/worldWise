import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// import { useEffect, useState } from "react";
import { CitiesProvider } from "./features/cities/context/CitiesProvider";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import CityList from "./features/cities/components/CityList";
import CountryList from "./features/cities/components/CountryList";
import City from "./features/cities/components/City";
import Form from "./features/cities/components/Form";
import SpinnerFullPage from "./components/ui/SpinnerFullPage";
// import Product from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// implement lazy loading => split the code (into separate chunks vite will take care of that) of js that improve the performance
// it does not only work with routes
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// Suspense API => it is allow the chunks to download or we can say its wait the chunks to download there js is file

const App = () => {
  // const x = 23;

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* This will render when you visit the base URL (/) */}
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                {/* creating nested routes */}
                {/* index route it is matches if none of nested routes are does not math  => the default case
          
          ||||
          we can use Navigate => declarative way that component in the nested route also
          */}
                {/* <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
            /> */}
                {/* redirect the link in default way
          when index or main root is an app the route parent so we redirect to the cities route 
          */}
                <Route index element={<Navigate replace to="cities" />} />

                <Route
                  path="cities"
                  element={
                    <CityList
                    // cities={cities} isLoading={isLoading}
                    />
                  }
                />
                {/* create params
            1- create new route
            2- link to that route
            3- read the state from URL
            it does not have to be nested routes
            */}
                <Route path="cities/:id" element={<City />} />
                <Route
                  path="countries"
                  element={
                    <CountryList

                    // cities={cities} isLoading={isLoading}
                    />
                  }
                />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};
export default App;
