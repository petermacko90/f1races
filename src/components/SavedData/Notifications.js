import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Notifications = ({ notifications, deleteNotification }) => {
  const sortedNotifications = notifications.slice().sort((a, b) => {
    return a.notificationDate - b.notificationDate;
  });

  return (
    <div className='container'>
      <h2 className='ml10 mr10'>Saved Notifications</h2>
      {
        notifications.length === 0 ?
          <p className='p10'>No saved notifications</p>
        :
          <div className='responsive-table'>
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
                  sortedNotifications.map(notification => {
                    const {
                      id, title, notified, raceDate, notificationDate
                    } = notification;
                    return (
                      <tr key={id}>
                        <td>
                          <button
                            onClick={deleteNotification(id)}
                            className='button ferrari'
                            title='Delete Notification'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                        <td>{title}</td>
                        <td>{notified ? 'Yes': 'No'}</td>
                        <td>
                          {raceDate.toLocaleDateString()} {raceDate.toLocaleTimeString()}
                        </td>
                        <td>
                          {notificationDate.toLocaleDateString()} {notificationDate.toLocaleTimeString()}
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
      }
    </div>
  );
}

export default Notifications;
