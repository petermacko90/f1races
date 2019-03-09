import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className='container'>
      <div className='responsiveTable'>
        <h2 className='notifications'>Saved Notifications</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Notified</th>
              <th>Race Date</th>
              <th>Notification Date</th>
            </tr>
          </thead>
          <tbody>
            {
              notifications.map((notification, i) => {
                const {
                  title, notified, raceDate, notificationDate
                } = notification;
                return (
                  <tr key={i}>
                    <td>{title}</td>
                    <td>{notified ? 'Yes': 'No'}</td>
                    <td>{raceDate.toLocaleDateString()} {raceDate.toLocaleTimeString()}</td>
                    <td>{notificationDate.toLocaleDateString()} {notificationDate.toLocaleTimeString()}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notifications;
