/*
// quietwater.js

export const getReplyList = hostId => createOrmSelector(
  session => {
    debugger;
    return session.Host.hasId(hostId)
      ? session.Host.withId(hostId).replies.toRefArray().map(reply =>
        ({ ...reply, author: session.User.withId(reply.author).ref })
      )
      : [];
  }
); */

// 在上面的例子中，其实更好的方式第 1 个参数不应该是 session，而是 HOST，session 应该放在第二个参数
