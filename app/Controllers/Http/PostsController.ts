// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { HttpContext } from '@adonisjs/http-server/build/standalone';

export default class PostsController {
  public async index() {
    const Posts = await Post.all()

    return Posts
  }

  public async store({ request }: HttpContext) {
    const data = request.only(['title', 'content'])

    const post = await Post.create(data)
    
    return post
  }

  public async show({ params }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    return post
  }

  public async update({ params, request }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'content'])

    post.merge(data)

    await post.save()

    return post

  }

  public async destroy({ params }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    return {
      post: "Deletado"
    }
  }

}