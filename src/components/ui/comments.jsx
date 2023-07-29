import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);
  const handleRemoveComment = (id) => {
    API.comments.remove(id).then((id) => {
      setComments(comments.filter((x) => x._id !== id));
    });
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">add comment</div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
            <div className="bg-light card-body  mb-3">
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-start ">
                    <img
                      src="https://avatars.dicebear.com/api/avataaars/qweqwdas"
                      className="rounded-circle shadow-1-strong me-3"
                      alt="avatar"
                      width="65"
                      height="65"
                    />
                    <div className="flex-grow-1 flex-shrink-1">
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-1 ">
                            User Name
                            <span className="small">Published Time</span>
                          </p>
                          <button className="btn btn-sm text-primary d-flex align-items-center">
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                        <p className="small mb-0">Comment content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
