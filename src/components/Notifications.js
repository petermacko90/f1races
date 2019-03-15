import React from 'react';

const Notifications = ({ notifications, deleteNotification }) => {
  if (notifications.length === 0) {
    return <p className='p10'>No saved notifications</p>;
  } else {
    return (
      <div className='container'>
        <div className='responsive-table'>
          <h2 className='ml10 mr10'>Saved Notifications</h2>
          <table>
            <thead>
              <tr>
                <th></th>
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
                      <td>
                        <button onClick={deleteNotification(i)}
                        className='button' title='Delete Notification'>
                          &times;
                        </button>
                      </td>
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
}

export default Notifications;
