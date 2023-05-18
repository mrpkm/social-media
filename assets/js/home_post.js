{

    // medthod to submit a form using ajax
    console.log("hello");
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        // console.log(newPostForm)

        newPostForm.submit(function (e) {
            e.preventDefault();
            // e.stopPropagation();


            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data)
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost))
                }, error: function (error) {
                    console.log(error.response.Text);
                }


            })

        });
        // $(document).ajaxStop(function () {
        //     window.location.reload();
        // });

    }

    // medthod to cerate a post in Dom
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
    <p>
       
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
            </small>
           
            ${post.content}
                    <br>
                    <small style="color: rgb(68, 247, 13); ">
                    ${post.user.name}
                    </small>
    </p>
    <div class="post-comment">
      
            <form action="/comment/create" method="post" id="post-${post._id}-comments-form">
                <input type="text" name="content" placeholder="type here to add comment">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="add comment">
            </form>
         
                <!-- for comment -->
                <div class="post-comment-list" style="margin-left: 30px;">
                    <ul id="post-comment"-${post._id}>
                       
                    </ul>
                </div>
    </div>

  

</script>

</li>`)

    }



    //method to delete a post form DOM

    let deletePost = function (deleteLink) {
        console.log(deleteLink);
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    // console.log(data);
                }, error: function (err) {
                    console.log(err.responseText);
                }
            })
        })
    }





    createPost();
}

