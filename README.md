

###  Task 2 – Real-Time Location Sharing

This task implements **real-time location sharing** between users using:

* **React** for frontend UI
* **Leaflet** for interactive map rendering
* **SignalR** for WebSocket-based real-time communication
* **Custom user icons** and live updates on the map
* **Proxy setup** for local development (`/Hub` to SignalR server)

Each connected user shares their geolocation in real-time and sees others' live positions on the map.

SignalR Hub Endpoint:

```
https://tech-test.raintor.com/Hub/
```



###  Task 3 – Infinite Scrolling User Feed

This task implements an **infinite scrolling user feed** using:

* **React Query** (`useInfiniteQuery`) for paginated API fetching
* **Intersection Observer** to detect scroll and load more users
* **Virtualization** with `react-window` for performance
* **Skeleton loaders** for better UX while loading
* **Accessible and responsive** user card design

API Endpoint used:

```
https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=0
```


