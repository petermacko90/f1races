import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Notifications({ notifications, deleteNotification }) {
  return (
    <>
      <h2 className="ml3 mr3">Saved Notifications</h2>
      {notifications.length === 0
        ? <p className="p3">No saved notifications</p>
        :
          <div className="responsive-table">
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
                {notifications.map(n => (
                  <tr key={n.id}>
                    <td>
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="button bg-ferrari b-ferrari"
                        title="Delete Notification"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                    <td>{n.title}</td>
                    <td>{n.notified ? 'Yes' : 'No'}</td>
                    <td>
                      {n.raceDate.toLocaleDateString()} {n.raceDate.toLocaleTimeString()}
                    </td>
                    <td>
                      {n.notificationDate.toLocaleDateString()} {n.notificationDate.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </>
  );
}
