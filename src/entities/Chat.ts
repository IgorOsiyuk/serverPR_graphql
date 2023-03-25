
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Message from './Message';
import User from './User';

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[]

  @Column({ nullable: true })
  fromId: number;

  @Column({ nullable: true })
  toId: number;

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;

}

export default Chat;